using TaskManager.Models;

namespace TaskManager.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync(int userId);
        Task<TaskItem> CreateAsync(TaskItem task, int userId);
        Task<TaskItem?> UpdateAsync(int id, TaskItem task, int userId);
        Task<bool> DeleteAsync(int id, int userId);
    }
}
