import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  DollarSign,
  Activity,
  Sun,
  Cloud,
  CloudRain,
  Wind,
} from 'lucide-react';

const StructuredDataDisplay = ({ data }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun className="w-5 h-5 text-yellow-500" />;
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain'))
      return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (conditionLower.includes('cloud'))
      return <Cloud className="w-5 h-5 text-gray-500" />;
    if (conditionLower.includes('wind'))
      return <Wind className="w-5 h-5 text-gray-400" />;
    return <Sun className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      {data.suggested_destinations &&
        data.suggested_destinations.length > 0 && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-white" />
              <div>
                <p className="text-white/80 text-sm font-medium">Destination</p>
                <p className="text-white text-xl font-bold">
                  {data.suggested_destinations.join(', ')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      {data.estimated_cost && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Estimated Cost
                </p>
                <p className="text-gray-900 text-2xl font-bold">
                  ₹{data.estimated_cost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {data.Activities && data.Activities.length > 0 && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900 font-bold text-lg">
              Activities Included
            </h3>
          </div>
          <div className="space-y-2">
            {data.Activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {activity}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {data.DayWiseItinerary &&
        Object.keys(data.DayWiseItinerary).length > 0 && (
          <motion.div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900 font-bold text-lg">
                Day-wise Itinerary
              </h3>
            </div>
            {Object.entries(data.DayWiseItinerary).map(
              ([dayKey, dayData], idx) => (
                <motion.div
                  key={dayKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedDay(expandedDay === dayKey ? null : dayKey)
                    }
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold rounded-xl px-4 py-2 text-lg">
                        {dayKey.replace('Day ', 'Day ')}
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-semibold text-base">
                          {dayData.day}
                        </p>
                        {dayData.weather_details && (
                          <div className="flex items-center gap-2 mt-1">
                            {getWeatherIcon(dayData.weather_details.condition)}
                            <span className="text-gray-600 text-sm">
                              {dayData.weather_details.temperature ||
                                'Pleasant'}{' '}
                              •{' '}
                              {dayData.weather_details.condition ||
                                'Good weather'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-gray-600 text-xs">Cost</p>
                        <p className="text-blue-600 font-bold text-base">
                          ₹{dayData.approximate_cost?.toLocaleString()}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedDay === dayKey ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedDay === dayKey && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-5 space-y-3 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                          {dayData.activities?.map((activity, actIdx) => (
                            <motion.div
                              key={actIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: actIdx * 0.05 }}
                              className="flex gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                {actIdx + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-800 font-medium">
                                  {activity.activity ||
                                    activity.name ||
                                    activity}
                                </p>
                                {activity.description && (
                                  <p className="text-gray-600 text-sm mt-1">
                                    {activity.description}
                                  </p>
                                )}
                                {activity.cost && (
                                  <p className="text-blue-600 text-sm font-semibold mt-2">
                                    ₹{activity.cost.toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            )}
          </motion.div>
        )}
    </motion.div>
  );
};

export default StructuredDataDisplay;
