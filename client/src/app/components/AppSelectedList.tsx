import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Porps extends UseControllerProps {
  label: string;
  item: string[];
}

export default function AppSelectedList(props: Porps) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel >{props.label}</InputLabel>
      <Select
        value={field.value}
        label={props.label}
        onChange={field.onChange}
      >
        {props.item.map((item,index)=>(
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
        
       
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
