import { Container, Title, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import classes from '../styles/Header.module.css';

function Header() {
  const { setColorScheme, colorScheme } = useMantineColorScheme(); // Retrieve theme
  const dark = colorScheme === "dark"; // Check if dark theme is active

  return (
    <Container className={classes.headerWrapper}>
      <header>
          <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => setColorScheme(dark ? "light" : "dark")} 
          title="Toggle color scheme"
          className={classes.toggleThemeButton}
          >
            {dark ? (
                <SunIcon style={{ width: 18, height: 18 }} />
              ) : (
                  <MoonIcon style={{ width: 18, height: 18 }} />
              )}
          </ActionIcon>
          <Title order={1}>KaraVan</Title>
      </header>
    </Container>
  );
}

export default Header;