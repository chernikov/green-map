using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace green_map.Helpers {
    public class Uploads {
        public string ServiceBackground { get; set; }
    }

    public class UploadManager {
        public Uploads paths = new Uploads() {
            ServiceBackground = "Upload/shape-images"
        };

        public void CheckFoldersExist() {
            foreach(PropertyInfo keyData in paths.GetType().GetProperties()) {
                var path = keyData.GetValue(paths).ToString();
                if(path != null && !Directory.Exists(path)) Directory.CreateDirectory(path);
            }
        }
    }
}