import { CollectorConfiguration } from '../../Shared/types';
import { Implementation } from '../types';
import { collect } from './Collector';
import { create } from './Factory';

export const list = (configuration: CollectorConfiguration): Implementation[] => collect(configuration).map(create);
