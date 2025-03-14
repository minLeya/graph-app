-- Создание таблицы для графов
create table graphs (
    id uuid default uuid_generate_v4() primary key,
    category text not null,
    type text not null,
    vertices jsonb not null,
    edges jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Создание таблицы для тестов
create table tests (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    category text not null,
    difficulty text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Создание таблицы для заданий
create table tasks (
    id uuid default uuid_generate_v4() primary key,
    test_id uuid references tests(id) on delete cascade not null,
    type text not null,
    title text not null,
    description text,
    graph_id text,
    options jsonb,
    correct_answer text not null,
    max_score integer not null default 10,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Создание таблицы для прогресса студентов
create table student_progress (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    task_id uuid references tasks(id) on delete cascade not null,
    answer text,
    is_correct boolean,
    score integer,
    attempts integer default 1,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, task_id)
);

-- Создание таблицы для профилей пользователей
create table user_profiles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null unique,
    full_name text,
    group_name text,
    total_score integer default 0,
    completed_tasks integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Создание триггера для автоматического обновления updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger update_graphs_updated_at
    before update on graphs
    for each row
    execute function update_updated_at_column();

create trigger update_tests_updated_at
    before update on tests
    for each row
    execute function update_updated_at_column();

create trigger update_tasks_updated_at
    before update on tasks
    for each row
    execute function update_updated_at_column();

create trigger update_student_progress_updated_at
    before update on student_progress
    for each row
    execute function update_updated_at_column();

create trigger update_user_profiles_updated_at
    before update on user_profiles
    for each row
    execute function update_updated_at_column();

-- Создание политик безопасности для таблиц
alter table graphs enable row level security;
alter table tests enable row level security;
alter table tasks enable row level security;
alter table student_progress enable row level security;
alter table user_profiles enable row level security;

-- Политики для чтения (доступно всем аутентифицированным пользователям)
create policy "Чтение графов доступно всем аутентифицированным пользователям"
    on graphs for select
    to authenticated
    using (true);

create policy "Чтение тестов доступно всем аутентифицированным пользователям"
    on tests for select
    to authenticated
    using (true);

create policy "Чтение заданий доступно всем аутентифицированным пользователям"
    on tasks for select
    to authenticated
    using (true);

-- Политики для прогресса студентов
create policy "Студенты могут видеть только свой прогресс"
    on student_progress for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Студенты могут создавать записи о своем прогрессе"
    on student_progress for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Студенты могут обновлять только свой прогресс"
    on student_progress for update
    to authenticated
    using (auth.uid() = user_id);

-- Политики для профилей пользователей
create policy "Пользователи могут видеть все профили"
    on user_profiles for select
    to authenticated
    using (true);

create policy "Пользователи могут создавать только свой профиль"
    on user_profiles for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Пользователи могут обновлять только свой профиль"
    on user_profiles for update
    to authenticated
    using (auth.uid() = user_id);

-- Политики для записи (доступно только администраторам)
create policy "Создание графов доступно только администраторам"
    on graphs for insert
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Обновление графов доступно только администраторам"
    on graphs for update
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Удаление графов доступно только администраторам"
    on graphs for delete
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Создание тестов доступно только администраторам"
    on tests for insert
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Обновление тестов доступно только администраторам"
    on tests for update
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Удаление тестов доступно только администраторам"
    on tests for delete
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Создание заданий доступно только администраторам"
    on tasks for insert
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Обновление заданий доступно только администраторам"
    on tasks for update
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Удаление заданий доступно только администраторам"
    on tasks for delete
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

-- Триггер для создания профиля пользователя при регистрации
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.user_profiles (user_id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 