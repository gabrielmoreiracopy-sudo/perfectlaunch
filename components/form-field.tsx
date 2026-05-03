import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
};

export function FormField({ label, name, defaultValue, type = "text", textarea, placeholder }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} name={name} defaultValue={defaultValue?.toString() ?? ""} placeholder={placeholder} />
      ) : (
        <Input id={name} name={name} type={type} defaultValue={defaultValue?.toString() ?? ""} placeholder={placeholder} />
      )}
    </div>
  );
}
