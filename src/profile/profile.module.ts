import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { FileUploadService } from 'src/utils/file-upload/file-upload.service';

@Module({
    controllers: [ProfileController],
    providers: [FileUploadService],
})
export class ProfileModule { }