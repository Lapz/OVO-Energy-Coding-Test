import { IconButton, Input, Paper, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
);

interface ISearchBarProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
  onChange,
  onSubmit
}) => {
  const classes = useStyles({});
  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        await onSubmit();
      default:
        break;
    }
  };

  return (
    <Paper className={classes.root}>
      <Input
        className={classes.input}
        placeholder="Get the weather forecast for a city"
        inputProps={{ "aria-label": "Get the weather forecast for a city" }}
        onChange={onChange}
        onSubmit={onSubmit}
        onKeyDown={handleEnter}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={onSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
