export function PageTitle({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-semibold leading-tight tracking-normal">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
