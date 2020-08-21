import React from 'react';

import TurnMagazine from '../../components/TurnMagazine';
import { allImages } from './makeData';

const Magazine = () => <TurnMagazine images={allImages} zoom autoFullScreen audio />;
export default Magazine;
