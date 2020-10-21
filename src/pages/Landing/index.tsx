import React from 'react';
import * as s from './styles';
import logoImg from '../../assets/images/logo.svg';
import { FiArrowRight } from 'react-icons/fi'
import { Link} from 'react-router-dom';

const Landing: React.FC = () => {
    return (
        <s.Landing>
            <s.CotentWrapper>
                <img src={logoImg} alt="logo" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia a dia de uitas crianças.</p>
                </main>
                <s.Location>
                    <strong>Natal</strong> <span>Rio Grande do Norte</span>

                </s.Location>
                <Link to='/app'>
                    <FiArrowRight fontSize={24} color='rgb(0,0,0,.6)' />
                </Link>
            </s.CotentWrapper>

        </s.Landing>
      );
}

export default Landing;