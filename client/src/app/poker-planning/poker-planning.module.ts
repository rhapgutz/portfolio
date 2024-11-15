import { NgModule } from '@angular/core';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserStoriesDataService } from './services/user-story/user-stories-data.service';
import { UserStory } from './models/user-story.model';
import { SharedModule } from '../shared/shared.module';
import { UserStoryEntityService } from './services/user-story/user-story-entity.service';
import { PlanningComponent } from './pages/planning/planning.component';
import { UserStoryCardComponent } from './components/user-story-card/user-story-card.component';
import { PokerCardComponent } from './components/poker-card/poker-card.component';
import { UserStoryComponent } from './components/user-story/user-story.component';
import { UserStoriesResolver } from './services/user-story/user-stories.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { currentUserStoryFeatureKey, currentUserStoryReducer } from './services/user-story/reducers/current-user-story';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { UserStorySocketService } from './services/user-story/user-story-socket.service';
import { EffectsModule } from '@ngrx/effects';
import { UserStoryEffects } from './services/user-story/user-story.effects';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserMessageEntityService } from './services/user-message/user-message-entity.service';
import { UserMessagesDataService } from './services/user-message/user-messages-data.service';
import { UserMessage } from './models/user-message.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMessagesResolver } from './services/user-message/user-messages-resolver';

const config: SocketIoConfig = { url: environment.socket_url, options: {} };

const routes: Routes = [
  {
    path: "poker-planning",
    component: PlanningComponent,
    resolve: {
      userStories: UserStoriesResolver,
      userMessages: UserMessagesResolver
    },
    canActivate: [AuthGuard],

  }
];

@NgModule({
  declarations: [
    PlanningComponent,
    UserStoryCardComponent,
    PokerCardComponent,
    UserStoryComponent,
    UserMessagesComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(currentUserStoryFeatureKey, currentUserStoryReducer),
    EffectsModule.forFeature([UserStoryEffects]),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    UserStoryEntityService,
    UserStoriesDataService,
    UserMessageEntityService,
    UserMessagesDataService,
    UserStorySocketService
  ]
})
export class PokerPlanningModule { 
  constructor(
    private readonly eds: EntityDefinitionService,
    private readonly entityDataService: EntityDataService,
    private readonly userStoriesDataService: UserStoriesDataService,
    private readonly userMessagesDataService: UserMessagesDataService
  ) {
    const entityMetadata: EntityMetadataMap = {
      UserStory: {
        selectId: (userStory: UserStory) => userStory._id,
        entityDispatcherOptions: {
          optimisticUpdate: true,
        },
      },
      UserMessage: {
        selectId: (userMessage: UserMessage) => userMessage._id,
        entityDispatcherOptions: {
          optimisticUpdate: true,
        },
      }
    };

    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService("UserStory", userStoriesDataService);
    entityDataService.registerService("UserMessage", userMessagesDataService);
  }
}
