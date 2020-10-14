import { collect } from './Collector';
import { create } from './Factory';
import { CollectorConfiguration } from '../../Shared/types';
import { Requirement } from '../types';

export const list = (configuration: CollectorConfiguration): Requirement[] => collect(configuration).map(create);
