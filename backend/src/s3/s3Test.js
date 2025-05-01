import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

async function whoAmI() {
  const sts = new STSClient({ region: "us-east-2" });
  const resp = await sts.send(new GetCallerIdentityCommand({}));
  console.log("SDK sees:", resp);
}

await whoAmI();