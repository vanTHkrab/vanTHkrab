import {Injectable} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // This guard uses the 'local' strategy defined in the local.strategy.ts file.
  // It can be extended to add additional functionality if needed.
  // For example, you could override the handleRequest method to customize the user object returned.
}