import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { UpdateProfileDto } from 'src/modules/profile/dto/update-profile.dto';
import { ProfileService } from 'src/modules/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param() params: { id: string }) {
    return this.profileService.find(params.id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param() params: { id: string },
    @Body() body: UpdateProfileDto,
  ) {
    await this.profileService.update(body, params.id);
    return {
      status: 'success',
      message: 'Update profile successfully!',
    };
  }
}
