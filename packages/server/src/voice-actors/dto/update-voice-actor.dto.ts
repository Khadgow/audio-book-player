import { PartialType } from '@nestjs/swagger';
import { CreateVoiceActorDto } from './create-voice-actor.dto';

export class UpdateVoiceActorDto extends PartialType(CreateVoiceActorDto) {}
