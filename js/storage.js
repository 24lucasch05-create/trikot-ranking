/**
 * Storage Module
 * Handles localStorage persistence for jersey rankings.
 */
const Storage = {
    STORAGE_PREFIX: 'jersey-ranking-',

    /**
     * Get the full storage key for a category
     * @param {string} categoryId 
     * @returns {string}
     */
    _getKey(categoryId) {
        return `${this.STORAGE_PREFIX}${categoryId}`;
    },

    /**
     * Save ranking for a category
     * @param {string} categoryId 
     * @param {string[]} orderedTeamIds 
     * @returns {boolean} True if successful
     */
    saveRanking(categoryId, orderedTeamIds) {
        if (!categoryId || !Array.isArray(orderedTeamIds)) return false;
        
        try {
            const key = this._getKey(categoryId);
            localStorage.setItem(key, JSON.stringify(orderedTeamIds));
            return true;
        } catch (error) {
            console.error('Error saving ranking to localStorage:', error);
            return false;
        }
    },

    /**
     * Load ranking for a category
     * @param {string} categoryId 
     * @returns {string[]|null} Array of team IDs or null if not found/error
     */
    loadRanking(categoryId) {
        if (!categoryId) return null;

        try {
            const key = this._getKey(categoryId);
            const data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            return null;
        } catch (error) {
            console.error('Error loading ranking from localStorage:', error);
            return null;
        }
    },

    /**
     * Check if a ranking exists for a category
     * @param {string} categoryId 
     * @returns {boolean}
     */
    hasRanking(categoryId) {
        if (!categoryId) return false;
        
        try {
            const key = this._getKey(categoryId);
            return localStorage.getItem(key) !== null;
        } catch (error) {
            return false;
        }
    },

    /**
     * Reset ranking for a specific category
     * @param {string} categoryId 
     * @returns {boolean} True if successful
     */
    resetRanking(categoryId) {
        if (!categoryId) return false;

        try {
            const key = this._getKey(categoryId);
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing ranking from localStorage:', error);
            return false;
        }
    },

    /**
     * Reset all rankings
     * @returns {boolean} True if successful
     */
    resetAll() {
        try {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.STORAGE_PREFIX)) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Error clearing rankings from localStorage:', error);
            return false;
        }
    },

    /**
     * Export ranking as formatted text
     * @param {string} categoryId 
     * @param {Array} teamsData - Array of team objects to get names from
     * @returns {string|null} Formatted text or null if error/no ranking
     */
    exportRanking(categoryId, teamsData) {
        const ranking = this.loadRanking(categoryId);
        if (!ranking || !teamsData || !Array.isArray(teamsData)) {
            return null;
        }

        try {
            const lines = [`Jersey Ranking: ${categoryId}`, ''];
            
            ranking.forEach((teamId, index) => {
                const team = teamsData.find(t => t.id === teamId || t.slug === teamId);
                const teamName = team ? team.name : teamId;
                lines.push(`${index + 1}. ${teamName}`);
            });

            return lines.join('\n');
        } catch (error) {
            console.error('Error exporting ranking:', error);
            return null;
        }
    }
};

window.Storage = Storage;
