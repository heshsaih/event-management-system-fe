import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type ControlledAutocompleteProps = {
  name: string;
  options: AutocompleteOption[];
  label: string;
  "aria-label"?: string;
  onChangeCallback?: (id: string) => void;
  filterCallback?: (phrase: string) => void;
  initialState?: AutocompleteOption;
  disabled?: boolean;
  optional?: boolean;
  loading?: boolean;
} & (
    | {
      createable: true;
      createLabel: string;
      createValue: string;
      onCreateCallback: () => void;
    }
    | {
      createable: false;
    }
  ) &
  (
    | {
      async: true;
      componentState: AutocompleteOption;
      setComponentState: Dispatch<SetStateAction<AutocompleteOption>>;
    }
    | {
      async: false;
    }
  );

export default function ControlledAutocomplete(
  props: ControlledAutocompleteProps,
) {
  const { field, fieldState } = useController({
    name: props.name,
  });
  const { t } = useTranslation();
  const [state, setState] = useState<AutocompleteOption>(
    props.initialState
      ? props.initialState
      : {
        value: "",
        label: "",
      },
  );

  useEffect(
    function() {
      if (props.initialState) {
        setState(props.initialState);
      }
    },
    [props.initialState],
  );

  return (
    <Box width={"100%"}>
      <Autocomplete
        aria-label={props["aria-label"]}
        disabled={props.disabled ?? false}
        noOptionsText={"Brak opcji"}
        fullWidth
        sx={{
          marginTop: ".5rem",
          marginBottom: !fieldState.error ? ".5rem" : "0",
        }}
        options={props.options}
        getOptionLabel={function(option) {
          return option ? option.label : "";
        }}
        value={props.async ? props.componentState : state}
        filterOptions={function(options, params) {
          const filtered = options.filter(function(e) {
            return e.label
              .toLowerCase()
              .includes(params.inputValue.toLowerCase());
          });
          if (filtered.length === 0 && props.createable) {
            filtered.push({
              label: props.createLabel as string,
              value: props.createValue as string,
            });
            if (props.filterCallback) {
              props.filterCallback(params.inputValue);
            }
          } else {
            props.filterCallback && props.filterCallback(params.inputValue);
          }
          return filtered;
        }}
        onChange={function(_, e) {
          if (e) {
            if (
              props.createable &&
              e.value === props.createValue &&
              props.onCreateCallback
            ) {
              props.onCreateCallback();
              field.onChange({
                label: "",
                value: "",
              });
              if (props.async && props.setComponentState) {
                props.setComponentState({
                  value: "",
                  label: "",
                });
              } else {
                setState({
                  label: "",
                  value: "",
                });
              }
            } else {
              field.onChange(e);
              if (props.async) {
                props.setComponentState(e);
              } else {
                setState(e);
              }
              props.onChangeCallback && props.onChangeCallback(e.value);
            }
          }
        }}
        renderInput={function(params) {
          return (
            <TextField
              error={!!fieldState.error}
              {...params}
              label={props.label}
            ></TextField>
          );
        }}
      ></Autocomplete>
      {fieldState.error && (
        <Typography
          textAlign={"start"}
          marginBottom={"0.5rem"}
          variant="body2"
          color="error"
        >
          {
            //@ts-ignore
            t(fieldState.error["value"].message)
          }
        </Typography>
      )}
    </Box>
  );
}
