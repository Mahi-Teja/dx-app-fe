const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

export default Detail;
