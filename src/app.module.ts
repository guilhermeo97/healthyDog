import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GuideDogModule } from './modules/guide-dog/infra/module/guide-dog.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { MedicalConsultationModule } from './modules/medical-consultation/medical_consultation.module';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './modules/db/db.module';
import { SchoolModule } from './modules/school/infra/module/school.module';
import { HistoryTransferModule } from './modules/history-transfer/history-transfer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    GuideDogModule,
    MedicineModule,
    MedicalConsultationModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    SchoolModule,
    HistoryTransferModule,
  ],
})
export class AppModule {}
