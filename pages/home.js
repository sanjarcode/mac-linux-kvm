import os from "os";

export default function HomePage({
  hostname,
  ipAddress,
  macAddress,
  platform,
}) {
  return (
    <div>
      <h1>Home page</h1>
      <h2 style={{ border: "1px dotted red" }}>
        Device
        {[
          { label: "Hostame", value: hostname },
          { label: "IP address", value: ipAddress },
          { label: "MAC address", value: macAddress },
          { label: "MAC address", value: platform },
        ].map(({ label, value }) => (
          <p key={label}>
            <span>{label}</span>
            {": "}
            <code>{value}</code>
          </p>
        ))}
      </h2>
    </div>
  );
}

export function getStaticProps() {
  const hostname = os.hostname();
  const platform = os.platform();
  const networkInfo = Object.values(os.networkInterfaces())
    .flat()
    .map(({ address }) => address.toString().startsWith("192"));
  return {
    props: {
      hostname,
      ipAddress: networkInfo.address || "NA",
      mac: networkInfo.mac || "NA",
      platform,
    },
  };
}
