import { ApiProperty } from '@nestjs/swagger';
import { StockMovementResponseDto } from './stock-movement-response.dto';

export class StockMovementListDto {
    @ApiProperty({ type: [StockMovementResponseDto] })
    movements: StockMovementResponseDto[];

    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;
}
