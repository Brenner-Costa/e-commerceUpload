import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (mongoose.isConnected) {
    console.log('Aplicação já conectada ao banco de dados');
    return;
  }
  //retirar o [0]
  if (mongoose.connections[0].lenght > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Usar conexão anterior');
      return;
    }
    await mongoose.disconnect();
  }
  const db = mongoose.connect(process.env.MONGODB_URI);
  console.log('Nova conexão');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'Produção') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Não desconectado');
    }
  }
}

function convertDocToObj(doc) {
  try {
    doc._id = doc._id.toString();

    if (doc.createdAt !== undefined) {
      doc.createdAt = doc.createdAt.toString();
    } else {
      console.log('ERROR: convertDocToObj - createdAt');
    }

    if (doc.updatedAt !== undefined) {
      doc.updatedAt = doc.updatedAt.toString();
    } else {
      console.log('ERROR: convertDocToObj - updatedAt');
    }
    return doc;
  } catch {
    console.log('ERRO: DOCUMENTO NÃO RECONHECIDO/CONVERTIDO');
  }
}

const db = { connect, disconnect, convertDocToObj };
export default db;
