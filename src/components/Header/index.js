import React from 'react';

import { Container, Search, User } from './styles';

const Header = () => (
  <Container>
    <Search>
      <input type="text" placeholder="Search" />
    </Search>

    <User>
      <img src="https://avatars2.githubusercontent.com/u/12723939?v=4" alt="Avatar" />
      Fillipi Nascimento
    </User>
  </Container>
);

export default Header;
