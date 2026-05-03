import { Select } from "@/components/ui/select";

const defaultStatuses = ["Pendente", "Em andamento", "Concluído"];

export function StatusSelect({
  name = "status",
  defaultValue,
  options = defaultStatuses
}: {
  name?: string;
  defaultValue?: string;
  options?: string[];
}) {
  return (
    <Select name={name} defaultValue={defaultValue ?? options[0]}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}
