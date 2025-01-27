import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto, CreateQuoteRequestDto } from './dto/create-quote.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User, UserRole } from 'src/user/dto/user.schema';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@ApiTags('quotes')
@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard)
  async createQuoteRequest(
    @Body() createQuoteRequestDto: CreateQuoteRequestDto,
    @GetUser() user: User,
  ) {
    return this.quoteService.createQuoteRequest(createQuoteRequestDto , user.user_id);
  }

  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ARTISAN)
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ) {
    return this.quoteService.createQuote(createQuoteDto, user.user_id);
  }

  @Get('job/:jobId/requests')
  async getQuoteRequestsByJob(@Param('jobId') jobId: string) {
    return this.quoteService.getQuoteRequestsByJob(jobId);
  }

  @Get('request/:requestId/quotes')
  async getQuotesByRequest(@Param('requestId') requestId: string) {
    return this.quoteService.getQuotesByRequest(requestId);
  }

  @Patch(':quoteId/status')
  @UseGuards(JwtAuthGuard)
  async updateQuoteStatus(
    @Param('quoteId') quoteId: string,
    @Body('status') status: 'accepted' | 'rejected',
  ) {
    return this.quoteService.updateQuoteStatus(quoteId, status);
  }
}