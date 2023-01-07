import os from "os";
import DeviceInfoBar from "../components/shared/DeviceInfoBar";
import WritingPad from "../components/WritingPad";
import { readFromStore } from "./api/store";

export default function HomePage(props) {
  return (
    <>
      <DeviceInfoBar {...props} />
      <WritingPad initStore={props.initStore} />
    </>
  );
}

export async function getServerSideProps() {
  const hostname = os.hostname();
  const platform = os.platform();
  const networkInfo = Object.values(os.networkInterfaces())
    .flat()
    .find(({ address }) => address.toString().startsWith("192"));

  const store = JSON.parse(await readFromStore());

  return {
    props: {
      hostname,
      ipAddress: networkInfo.address || "NA",
      platform,
      initStore: store,
    },
  };
}
