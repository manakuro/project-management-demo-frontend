package archivedactivityrepository

import (
	"context"
	"log"
	"project-management-demo-backend/ent/activitytype"
	"project-management-demo-backend/ent/archivedtaskactivity"
	"project-management-demo-backend/ent/archivedworkspaceactivity"
	"project-management-demo-backend/pkg/entity/model"

	"entgo.io/ent/dialect/sql"
)

func (r *archivedActivityRepository) List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error) {
	db := r.client.DB()

	archivedTaskActivityTable := sql.Table(archivedtaskactivity.Table).As(archivedtaskactivity.Table)
	archivedWorkspaceActivityTable := sql.Table(archivedworkspaceactivity.Table).As(archivedworkspaceactivity.Table)
	activityTypeTable := sql.Table(activitytype.Table).As(activitytype.Table)

	taskArchivedActivitySelector := sql.Select(
		sql.As(archivedTaskActivityTable.C(archivedtaskactivity.FieldID), "id"),
		sql.As(activityTypeTable.C(activitytype.FieldTypeCode), "type"),
		sql.As(archivedTaskActivityTable.C(archivedtaskactivity.FieldUpdatedAt), "updated_at"),
	).From(archivedTaskActivityTable).LeftJoin(activityTypeTable).On(
		archivedTaskActivityTable.C(archivedtaskactivity.FieldActivityTypeID),
		activityTypeTable.C(activitytype.FieldID),
	).Where(sql.EQ(archivedTaskActivityTable.C(archivedtaskactivity.FieldWorkspaceID), where.WorkspaceID))

	workspaceArchivedActivitySelector := sql.Select(
		sql.As(archivedWorkspaceActivityTable.C(archivedworkspaceactivity.FieldID), "id"),
		sql.As(activityTypeTable.C(activitytype.FieldTypeCode), "type"),
		sql.As(archivedWorkspaceActivityTable.C(archivedworkspaceactivity.FieldUpdatedAt), "updated_at"),
	).From(archivedWorkspaceActivityTable).LeftJoin(activityTypeTable).On(
		archivedWorkspaceActivityTable.C(archivedworkspaceactivity.FieldActivityTypeID),
		activityTypeTable.C(activitytype.FieldID),
	).Where(sql.EQ(archivedWorkspaceActivityTable.C(archivedworkspaceactivity.FieldWorkspaceID), where.WorkspaceID))

	t1 := sql.Table("t1").As("t1")
	selector := sql.Select(
		t1.C("id"),
		t1.C("type"),
		t1.C("updated_at"),
	).From(
		taskArchivedActivitySelector.Union(workspaceArchivedActivitySelector).As("t1"),
	).OrderBy(t1.C("updated_at"))

	queryString, args := selector.Query()
	rows, err := db.Query(queryString, args...)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	defer rows.Close()

	var archivedActivities []*model.ArchivedActivity
	for rows.Next() {
		var m model.ArchivedActivity
		err = rows.Scan(&m.ID, &m.Type, &m.UpdatedAt)
		if err != nil {
			log.Fatal(err)
		}
		archivedActivities = append(archivedActivities, &m)
	}
	if rows.Err() != nil {
		return nil, model.NewDBError(err)
	}

	return archivedActivities, nil
}
