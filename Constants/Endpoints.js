const api_url = "https://compassion-africa.org/api/user/api_result/"
const api_gateway_url = "https://4p7l020eh4.execute-api.eu-west-1.amazonaws.com/dev/"

export default {
    login: api_url + "login",
    register: api_url + "register/",
    dashboard_statistics: api_url + "get_dashboard_statistics/",
    themes: api_url + "themes/",
    add_goal: api_url + "add_goal/",
    add_plan: api_url + "add_plan/",
    get_goal: api_url + "goal/",
    add_task: api_url + 'add_task/',
    task_types: api_url + "get_task_types",
    goals: api_url + "goals/",
    goal: api_url + "goal/",
    tasks: api_url + "tasks/",
    task: api_url + "task/",
    add_task_note: api_url + "add_task_note/",
    task_notes: api_url + "get_task_notes/",
    //get_plans: api_url + "plan",
    //active_plan: api_url + "plan", //"active_plan/",
    get_plan: api_gateway_url + "plan",
    plan_statistics: api_url + "plan_statistics/",
    update_task_status: api_url + "update_task_status/",
    goal_statistics: api_url + "goal_statistics/",
    get_quarters: api_url + "get_quarters/", 
    language: api_url + "language_phrases/"
}