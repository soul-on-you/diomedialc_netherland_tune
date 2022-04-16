import { exec } from "child_process";
import { join } from "path";

// console.log(require("path").join(__dirname, "../..", "/bash/script.exp"));

export default function (server_ip, server_password, client_name, client_pass) {
  return new Promise(function (resolve, reject) {
    const scriptPath = join(__dirname, "../..", process.env.tunnel_script_path);
    const scriptBashPath = join(
      __dirname,
      "../..",
      process.env.tunnel_bash_script_path
    );
    const clientsPath = join(__dirname, "../..", process.env.clients_base_dir);

    const command = `${scriptPath} ${server_ip} ${server_password} ${client_name} ${client_pass} ${clientsPath} ${scriptBashPath}`;

    const childExecProcess = exec(`${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
      }
      //? console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    childExecProcess.on("exit", (returnCode) => {
      console.log(`childExecProcess finished with code ${returnCode}`);
      resolve();
    });
  });
}
