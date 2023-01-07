import os from "os";
import DeviceInfoBar from "../components/shared/DeviceInfoBar";

export default function HomePage(props) {
  return <DeviceInfoBar {...props} />;
}

export function getStaticProps() {
  const hostname = os.hostname();
  const platform = os.platform();
  const networkInfo = Object.values(os.networkInterfaces())
    .flat()
    .find(({ address }) => address.toString().startsWith("192"));

  return {
    props: {
      hostname,
      ipAddress: networkInfo.address || "NA",
      macAddress: networkInfo.mac || "NA",
      platform,
    },
  };
}
