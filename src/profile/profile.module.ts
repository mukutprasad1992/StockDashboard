import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { FileUploadService } from 'src/utils/file-upload/file-upload.service';
import { ProfileService } from './service/profile.service';

@Module({
    controllers: [ProfileController],
    providers: [FileUploadService, ProfileService],
})
export class ProfileModule { }