package taskfeedrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/taskfeed"
	"project-management-demo-backend/ent/taskfeedlike"
	"project-management-demo-backend/ent/taskfile"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskFeedRepository) Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.DeleteTaskFeedInputPayload{
		TaskFeed:      nil,
		TaskFeedLikes: []*model.TaskFeedLike{},
		TaskFiles:     []*model.TaskFile{},
	}

	deleted, err := client.TaskFeed.Query().Where(taskfeed.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	taskFeedLikes, err := client.TaskFeedLike.Query().Where(taskfeedlike.TaskFeedID(input.ID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(taskFeedLikes) > 0 {
		taskFeedLikeIds := make([]model.ID, len(taskFeedLikes))
		for i, t := range taskFeedLikes {
			taskFeedLikeIds[i] = t.ID
		}

		_, err = client.TaskFeedLike.Delete().Where(taskfeedlike.IDIn(taskFeedLikeIds...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	taskFiles, err := client.TaskFile.Query().Where(taskfile.TaskFeedID(input.ID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(taskFiles) > 0 {
		taskFileIds := make([]model.ID, len(taskFiles))
		for i, t := range taskFiles {
			taskFileIds[i] = t.ID
		}

		_, err = client.TaskFile.Delete().Where(taskfile.IDIn(taskFileIds...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	err = client.TaskFeed.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	if taskFeedLikes != nil {
		payload.TaskFeedLikes = taskFeedLikes
	}
	if taskFiles != nil {
		payload.TaskFiles = taskFiles
	}

	payload.TaskFeed = deleted

	return payload, nil
}
