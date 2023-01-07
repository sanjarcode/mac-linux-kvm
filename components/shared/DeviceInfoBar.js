export default function DeviceInfoBar({
  hostname,
  ipAddress,
  macAddress,
  platform,
}) {
  return (
    <div>
      <div
        style={{
          border: "1px dotted red",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {[
          { label: "Hostame", value: hostname },
          { label: "IP address", value: ipAddress },
          { label: "MAC address", value: macAddress },
          { label: "Platform", value: platform },
        ].map(({ label, value }) => (
          <p key={label}>
            <span>
              <strong>{label}</strong>
            </span>
            {": "}
            <code>
              {label.includes("IP") ? (
                <a
                  href={`http://${value}:3000`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </code>
          </p>
        ))}
      </div>
    </div>
  );
}
