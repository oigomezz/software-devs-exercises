import { Card, TextField } from "@mui/material";

export const TextArea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#222",
        p: 2,
        textAlign: "left",
        maxWidth: "100%",
      }}
    >
      <TextField
        label={label}
        multiline
        fullWidth
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
};
