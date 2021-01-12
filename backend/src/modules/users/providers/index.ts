import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCyrptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
