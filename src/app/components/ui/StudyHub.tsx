/**  
 * CODED BY: LUCCAS EASTMAN  
 *   
 * StudyHub Component  
 * A comprehensive learning management interface for students  
 * with real-time module tracking and progress management.  
 */  

import React, { useEffect, useState, useCallback, useMemo } from 'react';  
import axios, { AxiosError, AxiosResponse } from 'axios';  
import { useRouter } from 'next/navigation';  
import { useSession } from 'authjs/react';  
import ProtectedRoute from '@/components/security/ProtectedRoute';  
import LoadingSpinner from '@/components/ui/LoadingSpinner';  
import ErrorBoundary from '@/components/error/ErrorBoundary';  
import { toast } from 'react-toastify';  
import { debounce } from 'lodash';  

// Types definition for strict typing  
interface Module {  
  id: string;  
  title: string;  
  content: string;  
  difficulty: 'beginner' | 'intermediate' | 'advanced';  
  estimatedTime: number;  
  prerequisites?: string[];  
}  

interface StudyHubProps {  
  initialModules?: Module[];  
  refreshInterval?: number;  
}  

const StudyHub: React.FC<StudyHubProps> = ({   
  initialModules = [],   
  refreshInterval = 30000   
}) => {  
  // State management with TypeScript  
  const [modules, setModules] = useState<Module[]>(initialModules);  
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);  
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());  
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<Error | null>(null);  
  const [lastSync, setLastSync] = useState<Date>(new Date());  

  const { data: session, status } = useSession();  
  const router = useRouter();  

  // Memoized authentication check  
  const isAuthorized = useMemo(() => {  
    return status === 'authenticated' && session?.user?.role === 'student';  
  }, [status, session]);  

  // Enhanced security check  
  useEffect(() => {  
    if (status === 'unauthenticated') {  
      router.replace('/auth/login');  
      toast.error('Please login to access the Study Hub');  
    } else if (session?.user?.role !== 'student') {  
      router.replace('/unauthorized');  
      toast.error('Unauthorized access');  
    }  
  }, [status, session, router]);  

  // Optimized module fetching with error handling  
  const fetchModules = useCallback(async () => {  
    try {  
      setLoading(true);  
      const response: AxiosResponse<Module[]> = await axios.get(  
        `${process.env.NEXT_PUBLIC_API_URL}/api/modules`,  
        {  
          headers: {  
            Authorization: `Bearer ${session?.accessToken}`,  
          },  
        }  
      );  
      setModules(response.data);  
      setLastSync(new Date());  
    } catch (err) {  
      const error = err as AxiosError;  
      setError(new Error(error.response?.data?.message || 'Failed to fetch modules'));  
      toast.error('Error loading modules');  
    } finally {  
      setLoading(false);  
    }  
  }, [session]);  

  // Real-time module synchronization  
  useEffect(() => {  
    if (!isAuthorized) return;  

    fetchModules();  
    const syncInterval = setInterval(fetchModules, refreshInterval);  

    return () => clearInterval(syncInterval);  
  }, [fetchModules, isAuthorized, refreshInterval]);  

  // Optimized module selection with debouncing  
  const handleModuleSelect = useMemo(  
    () =>  
      debounce((module: Module) => {  
        setSelectedModule(module);  
        // Track module selection analytics  
        analytics.track('module_selected', {  
          moduleId: module.id,  
          moduleTitle: module.title,  
          timestamp: new Date().toISOString(),  
        });  
      }, 300),  
    []  
  );  

  // Enhanced module completion handling  
  const handleModuleComplete = async (moduleId: string): Promise<void> => {  
    try {  
      setLoading(true);  
      await axios.post(  
        `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${moduleId}/complete`,  
        {},  
        {  
          headers: {  
            Authorization: `Bearer ${session?.accessToken}`,  
          },  
        }  
      );  

      setCompletedModules(prev => new Set([...prev, moduleId]));  
      toast.success('Module completed successfully!');  

      // Update user progress in real-time  
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/progress`, {  
        moduleId,  
        completedAt: new Date().toISOString(),  
      });  
    } catch (err) {  
      const error = err as AxiosError;  
      toast.error('Failed to complete module');  
      setError(new Error(error.response?.data?.message || 'Error completing module'));  
    } finally {  
      setLoading(false);  
    }  
  };  

  if (loading) return <LoadingSpinner />;  

  return (  
    <ErrorBoundary>  
      <ProtectedRoute roles={['student']}>  
        <div className="container mx-auto py-8 bg-gray-900 text-white min-h-screen">  
          <header className="mb-8">  
            <h2 className="text-3xl font-bold">Study Hub</h2>  
            <p className="text-gray-400">Last synced: {lastSync.toLocaleTimeString()}</p>  
          </header>  

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">  
            <aside className="bg-gray-800 p-6 rounded-lg shadow-lg">  
              <h3 className="text-xl font-semibold mb-4">Learning Modules</h3>  
              <ul className="space-y-3">  
                {modules.map((module) => (  
                  <li key={module.id}>  
                    <button  
                      className={`  
                        w-full text-left px-4 py-2 rounded  
                        ${completedModules.has(module.id)   
                          ? 'bg-green-700 opacity-75'   
                          : 'bg-gray-700 hover:bg-gray-600'}  
                        transition-colors duration-200  
                      `}  
                      onClick={() => handleModuleSelect(module)}  
                    >  
                      {module.title}  
                    </button>  
                  </li>  
                ))}  
              </ul>  
            </aside>  

            <main className="md:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg">  
              {selectedModule ? (  
                <article>  
                  <h3 className="text-2xl font-semibold mb-4">{selectedModule.title}</h3>  
                  <div className="prose prose-invert max-w-none">  
                    {selectedModule.content}  
                  </div>  
                  <button  
                    className={`  
                      mt-6 px-6 py-3 rounded-lg font-semibold  
                      ${completedModules.has(selectedModule.id)  
                        ? 'bg-green-600 cursor-not-allowed'  
                        : 'bg-blue-600 hover:bg-blue-500'}  
                      transition-colors duration-200  
                    `}  
                    onClick={() => handleModuleComplete(selectedModule.id)}  
                    disabled={completedModules.has(selectedModule.id)}  
                  >  
                    {completedModules.has(selectedModule.id)   
                      ? 'Completed'   
                      : 'Mark as Complete'}  
                  </button>  
                </article>  
              ) : (  
                <div className="text-center text-gray-400">  
                  <p>Select a module to begin learning</p>  
                </div>  
              )}  
            </main>  
          </div>  
        </div>  
      </ProtectedRoute>  
    </ErrorBoundary>  
  );  
};  

export default StudyHub;