import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Profile, Content } from './styles';
import Logo from '~/assets/logo.png';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={Logo} alt="Meetapp" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Profile>
                        <strong>Name</strong>
                        <Link to="/profile">My Profile</Link>
                    </Profile>
                    <img
                        src="https://api.adorable.io/avatars/50/abott@adorable.png"
                        alt="Avatar"
                    />
                </aside>
            </Content>
        </Container>
    );
}