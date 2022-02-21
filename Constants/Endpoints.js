const api_url = "https://compassion-africa.org/api/"

export default {
    login: api_url + "user/api_result/login/",
    register: api_url + "user/api_result/register/",
    dashboard_statistics: api_url + "dashboard/api_result/dashboard_statistics/",
    themes: api_url + "theme/api_result/themes/",
    add_goal: api_url + "goal/api_result/add_goal/",
    edit_goal: api_url + "goal/api_result/edit_goal/",
    add_plan: api_url + "plan/api_result/add_plan/",
    get_goal: api_url + "goal/api_result/goal/",
    add_task: api_url + 'task/api_result/add_task/',
    task_types: api_url + "tasktype/api_result/tasktype",
    goals: api_url + "goal/api_result/goal/",
    goal: api_url + "goal/api_result/goal/",
    tasks: api_url + "task/api_result/task/",
    task: api_url + "task/api_result/task/",
    add_task_note: api_url + "tasknote/api_result/add_tasknote/",
    task_notes: api_url + "tasknote/api_result/tasknote/",
    get_plans: api_url + "plan/api_result/plan/",
    active_plan: api_url + "plan/api_result/plan/",
    get_plan: api_url + "plan/api_result/plan/",
    plan_statistics: api_url + "plan/api_result/plan_statistics/",
    update_task_status: api_url + "task/api_result/update_task_status/",
    goal_statistics: api_url + "goal/api_result/goal_statistics/",
    get_quarters: api_url + "goal/api_result/quarters/", 
    delete_goal: api_url + "goal/api_result/delete_goal/", 
    //language: api_url + "user/api_result/language_phrases/"
}