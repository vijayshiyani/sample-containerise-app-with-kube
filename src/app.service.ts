import { Injectable } from '@nestjs/common';
import { MyApplicationDto } from './dto/myapplication.dto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getVersion(): MyApplicationDto {
    return {
      myapplication: [
        {
          version: process.env.npm_package_version,
          lastcommitsha: this.getLastGitCommitHash(),
          description: 'pre-interview technical test',
        },
      ],
    };
  }

  getLastGitCommitHash() {
    return fs.readFileSync('public/current_build_git_commit.txt', 'utf8');
  }
}
