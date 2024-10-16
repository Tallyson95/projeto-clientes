import express from 'express';
import { faker } from '@faker-js/faker';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const clients = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number('+55 ## #####-####'),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####-###'),
  },
}));

app.get('/clients', (req, res) => {
  res.json(clients);
});

app.post('/clients', (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: 'Dados obrigatórios não fornecidos.' });
  }

  const newClient = {
    id: clients.length + 1,
    name,
    email,
    phone,
    address,
  };

  clients.unshift(newClient);

  res.status(201).json(newClient);
});

app.put('/clients/:id', (req, res) => {
  const { id } = req.params;
  const client = clients.find(c => c.id === Number(id));

  if (!client) {
    return res.status(404).json({ message: 'Cliente não encontrado.' });
  }

  const { phone, email, address } = req.body;

  if (phone) client.phone = phone;
  if (email) client.email = email;
  if (address) {
    client.address = {
      ...client.address,
      ...address,
    };
  }

  res.json(client);
});

app.delete('/clients/:id', (req, res) => {
  const { id } = req.params;
  const index = clients.findIndex(cliente => cliente.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Cliente não encontrado.' });
  }

  clients.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
