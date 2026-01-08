using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<TaskItem> CreateAsync(TaskItem task, int userId)
        {
            task.UserId = userId; // Encapsulate logic to enforce user ownership
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateAsync(int id, TaskItem updated, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return null;

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;

            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var task = await _context.Tasks
                 .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
