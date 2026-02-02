import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../../../domain/entities/user.entity';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    try {
      const adminEmail = 'admin@fopagroupe.com';

      // Vérifier si l'admin existe déjà
      const existingAdmin = await this.userRepository.findOne({
        where: { email: adminEmail },
      });

      if (existingAdmin) {
        console.log('Administrateur existe déjà:', adminEmail);
        return;
      }

      // Créer l'administrateur
      const adminPassword = await bcrypt.hash('Admin@2026!', 10);
      const admin = this.userRepository.create({
        email: adminEmail,
        name: 'Administrateur',
        phone: '+237697000001',
        username: 'admin',
        password: adminPassword,
        role: UserRole.ADMIN,
        isActive: true,
      });

      await this.userRepository.save(admin);
      console.log('Administrateur créé avec succès:', adminEmail);
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur:', error);
      // Ne pas bloquer le démarrage de l'application en cas d'erreur
    }
  }
}
