package teammatetasksectionrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/teammatetask"
	"project-management-demo-backend/ent/teammatetasksection"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/adapter/repository/taskrepository"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskSectionRepository) DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.TeammateTaskSection.
		Query().
		Where(teammatetasksection.IDEQ(input.ID)).
		Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	teammateTasks, err := client.TeammateTask.
		Query().
		Where(teammatetask.TeammateTaskSectionIDEQ(deleted.ID)).
		All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, deleted.ID)
		}
		return nil, model.NewDBError(err)
	}

	taskIDs := make([]model.ID, len(teammateTasks))
	for i, t := range teammateTasks {
		taskIDs[i] = t.TaskID
	}

	// TODO: Task repository can be called in usecase/usecase package
	taskRepo := taskrepository.New(r.client)
	p, err := taskRepo.DeleteAll(ctx, model.DeleteAllTaskInput{
		TaskIDs:     taskIDs,
		WorkspaceID: input.WorkspaceID,
		RequestID:   "",
	})
	if err != nil {
		return nil, err
	}

	err = client.TeammateTaskSection.DeleteOneID(deleted.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	deletedTeammateTaskIDs := make([]model.ID, len(p.TeammateTasks))
	deletedTaskIDs := make([]model.ID, len(p.TeammateTasks))
	for i, t := range p.TeammateTasks {
		deletedTeammateTaskIDs[i] = t.ID
		deletedTaskIDs[i] = t.TaskID
	}

	return &model.DeleteTeammateTaskSectionAndDeleteTasksPayload{
		TeammateTaskSection: deleted,
		TeammateTaskIDs:     deletedTeammateTaskIDs,
		TaskIDs:             deletedTaskIDs,
	}, nil
}
