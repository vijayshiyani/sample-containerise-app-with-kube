import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should receive application version and lastcommitsha', () => {
      const gitCommitHash = 'sampleHash';

      jest
        .spyOn(appService, 'getLastGitCommitHash')
        .mockImplementation(() => gitCommitHash);

      const result = {
        myapplication: [
          {
            version: process.env.npm_package_version,
            lastcommitsha: gitCommitHash,
            description: 'pre-interview technical test',
          },
        ],
      };
      expect(appController.getVersion()).toEqual(result);
    });
  });
});
