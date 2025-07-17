database:
  user: ${DATABASE_USER}
  password: ${DATABASE_PASSWORD}
  net: unix
  addr: ${DATABASE_HOST}
  dbname: ${DATABASE_NAME}
  allowNativePasswords: true
  params:
    parseTime: true
    charset: utf8mb4
    loc: Asia/Tokyo

server:
  address: 8080
