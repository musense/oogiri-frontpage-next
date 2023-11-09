module.exports = {
  apps: [
    {
      name: 'oogiri-test',
      exec_mode: 'fork',
      instances: '1',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      // error_file: "./logs/app-err.log",
      // out_file: "./logs/app-out.log",
      log: "./logs/app.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 4200,
      },
    }
  ]
}