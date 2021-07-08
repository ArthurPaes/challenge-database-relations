import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {
    console.log('teste');
  }

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const foundEmail = await this.customersRepository.findByEmail(email);

    if (foundEmail) {
      // eslint-disable-next-line no-new
      throw new AppError('Este email já foi cadastrado');
    }
    const customer = await this.customersRepository.create({ email, name });
    return customer;
  }
}

export default CreateCustomerService;
