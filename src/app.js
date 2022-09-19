'use strict'

const modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const dotenv = require('dotenv');
dotenv.config();

const options = {
  'host': process.env.HOST,
  'port': process.env.PORT
}

const req_bytes = 2
const client = new modbus.client.TCP(socket)

socket.on('connect', () => {
  client.readInputRegisters(process.env.ADDR_01, req_bytes)
    .then((res) => {
      console.log(res.response._body)
      socket.end()
    })
    .catch(() => {
      console.error(arguments)
      socket.end()
    })
  
  client.readInputRegisters(process.env.ADDR_02, req_bytes)
    .then((res) => {
      console.log(res.response._body)
      socket.end()
    })
    .catch(() => {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)

socket.connect(options)